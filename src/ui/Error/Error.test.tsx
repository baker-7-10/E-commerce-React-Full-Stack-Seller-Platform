import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Error from './Error';
import { MemoryRouter } from 'react-router-dom'; // ✅ إضافة MemoryRouter

describe('Alert Component', () => {
  test('يجب أن يعرض النص page err', () => {
    render(
      <MemoryRouter>
        <Error type="page err" text="err work" />
      </MemoryRouter>
    );
    expect(screen.getByText(/err work/i)).toBeInTheDocument();
  });
});
