import { Transition } from '@headlessui/react';
import { Stack, Alert as MuiAlert } from '@mui/material';

function Alert({ showAlert, text }: { showAlert: boolean; text: string }) {
  return (
    <div>
      <Transition
        show={showAlert}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0 scale-90"
        enterTo="opacity-100 scale-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-90"
      >
        <Stack
          sx={{ width: '100%' }}
          spacing={2}
          className="shadow-lg shadow-teal-400"
        >
          <MuiAlert severity="success"> {text} success </MuiAlert>
        </Stack>
      </Transition>
    </div>
  );
}

export default Alert;
