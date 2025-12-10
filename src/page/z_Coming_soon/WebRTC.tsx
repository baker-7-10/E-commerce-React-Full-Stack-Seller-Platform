import supabase from '@/backend/supabase';
import React, { useEffect, useRef, useState } from 'react';

interface Signal {
  id?: number;
  sender: string;
  receiver: string;
  type: 'offer' | 'answer' | 'ice';
  sdp?: any;
  candidate?: any;
}

const WebRTCChat = ({ userId = '9163ab9d-7979-4ce0-805e-b7d4aa19aeab', peerId = 'd400d6fc-9be9-4e07-8f84-dd0a4271f1ef' }: { userId: string; peerId: string }) => {
  const localAudioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    localAudioRef.current!.srcObject = stream;

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
    pcRef.current = pc;

    // إضافة المسارات المحلية
    stream.getTracks().forEach(track => pc.addTrack(track, stream));

    // استقبال الصوت البعيد
    pc.ontrack = (event) => {
      remoteAudioRef.current!.srcObject = event.streams[0];
    };

    // إرسال ICE candidates عبر Supabase
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        supabase.from('AudioSignals').insert({
          sender: userId,
          receiver: peerId,
          type: 'ice',
          candidate: event.candidate,
        } as Signal);
      }
    };

    // إنشاء offer
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    await supabase.from('AudioSignals').insert({
      sender: userId,
      receiver: peerId,
      type: 'offer',
      sdp: offer,
    } as Signal);

    setIsStreaming(true);
  };

  const stopCall = () => {
    pcRef.current?.close();
    pcRef.current = null;
    setIsStreaming(false);
  };

  // استقبال الإشارات من Supabase
  useEffect(() => {
    const channel = supabase
      .channel('audio-signaling')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'AudioSignals' }, async payload => {
        const signal = payload.new as Signal;

        if (signal.receiver !== userId || !pcRef.current) return;

        const pc = pcRef.current;

        if (signal.type === 'offer') {
          await pc.setRemoteDescription(signal.sdp);
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);

          await supabase.from('AudioSignals').insert({
            sender: userId,
            receiver: signal.sender,
            type: 'answer',
            sdp: answer,
          } as Signal);
        }

        if (signal.type === 'answer') {
          await pc.setRemoteDescription(signal.sdp);
        }

        if (signal.type === 'ice' && signal.candidate) {
          await pc.addIceCandidate(signal.candidate);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">الدردشة الصوتية</h2>

      <audio ref={localAudioRef} autoPlay muted />
      <audio ref={remoteAudioRef} autoPlay />

      {!isStreaming ? (
        <button onClick={startCall} className="mt-2 bg-green-500 text-white py-2 px-4 rounded">
          بدء الدردشة الصوتية
        </button>
      ) : (
        <button onClick={stopCall} className="mt-2 bg-red-500 text-white py-2 px-4 rounded">
          إيقاف الدردشة الصوتية
        </button>
      )}
    </div>
  );
};

export default WebRTCChat;
