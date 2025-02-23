import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import DogDropField from '../components/Drop Fields/DogDropField.tsx';
import { vi } from 'vitest';

// Mock the necessary functions
vi.mock('onnxruntime-web', () => ({
  __esModule: true,
  InferenceSession: {
    create: vi.fn().mockResolvedValue({
      run: vi.fn().mockResolvedValue({ output: { data: new Float32Array([1, 0.5, 0.2]) } }),
    }),
  },
  env: { wasm: { wasmPaths: '/' } },
  Tensor: vi.fn(),
}));

// Mock createImageBitmap
global.createImageBitmap = vi.fn().mockResolvedValue({ width: 224, height: 224 });

const createMockFile = (filename: string, type: string, size = 1024) => {
  const blob = new Blob(['dummy content'], { type });
  Object.defineProperty(blob, 'name', { value: filename });
  Object.defineProperty(blob, 'size', { value: size });
  return blob as File;
};

test('renders and processes file upload', async () => {
  render(
    <MemoryRouter>
      <DogDropField />
    </MemoryRouter>
  );

  const dropzone = screen.getByText(/Drag and drop your pet image here/i);
  const mockFile = createMockFile('test-dog.jpg', 'image/jpeg');

  // Simulate file drop
  fireEvent.drop(dropzone, {
    dataTransfer: {
      files: [mockFile],
      types: ['Files'],
    },
  });

  // Wait for the "Continue" button to appear
  const continueButton = await screen.findByText('Continue');
  expect(continueButton).toBeInTheDocument();

  // Simulate clicking on "Continue"
  fireEvent.click(continueButton);

  // Wait for processing spinner to appear
  expect(screen.getByText('Processing...')).toBeInTheDocument();

  // Optionally, check if the spinner disappears after processing
  await screen.findByText('Continue');  // Check if button is back after loading
});
