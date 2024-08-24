export const clapPlay = (clap, volume) => {
  clap.current.volume = volume;
  clap.current.play();
};
