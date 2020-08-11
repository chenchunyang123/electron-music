import './reset.css';

export const dva = {
  config: {
    onError(e: Error) {
      console.log(e.message);
    },
  },
};
