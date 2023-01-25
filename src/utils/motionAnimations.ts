const fadeEasing = [0.6, -0.05, 0.01, 0.99];

const duration = {
  short: 0.5,
  medium: 1,
  long: 1.5,
};

const animationContainer = {
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.2,
      easing: fadeEasing,
    },
  },
};

const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.short,
    },
  },
};

const dynamicFadeInUp = ({ dur = duration.short, delay = 0 }) => ({
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: dur,
      delay,
    },
  },
});

const fadeInRight = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.short,
    },
  },
};

const fadeInLeft = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.short,
    },
  },
};

export const fadeIn = {
  animationContainer,
  up: fadeInUp,
  dynamicUp: dynamicFadeInUp,
  right: fadeInRight,
  left: fadeInLeft,
  easing: fadeEasing,
};

const layoutDuration = 0.4;

const layoutVariants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: layoutDuration,
      delay: 0.3,
      ease: "linear",
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: layoutDuration,
      ease: "linear",
      when: "beforeChildren",
    },
  },
};

export const layoutAnim = {
  layoutVariants,
};
