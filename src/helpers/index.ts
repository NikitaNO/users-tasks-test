export const delay = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

export const action =
  type =>
    (payload, meta = null) => ({
      type,
      payload,
      meta
    });
