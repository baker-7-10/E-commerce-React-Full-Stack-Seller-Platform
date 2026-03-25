import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Alert from './Alert';

describe('Alert Component', () => {
  test('يجب أن يعرض النص عند ظهور التنبيه', () => {
    render(<Alert showAlert={true} text="تمت العملية بنجاح" />);
    expect(screen.getByText(/تمت العملية بنجاح/i)).toBeInTheDocument();
  });

  test('يجب ألا يظهر التنبيه عندما يكون `showAlert=false`', () => {
    render(<Alert showAlert={false} text="لن يظهر هذا النص" />);
    expect(screen.queryByText(/لن يظهر هذا النص/i)).toBeNull();
  });
});
