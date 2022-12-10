import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastSuccess = (value, position = 'top-right', time = 2000) =>
  toast.success(`🦄 ${value}`, {
    position,
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const toastError = (value, position = 'top-right', time = 2000) =>
  toast.error(`🦄 ${value}`, {
    position,
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const toastComingSoon = (value, position = 'top-right', time = 1500) =>
  toast.success(`Sắp ra mắt !`, {
    position,
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const toastWarning = (value, position = 'top-right', time = 2000) =>
  toast.warn(`🦄 ${value}`, {
    position,
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
