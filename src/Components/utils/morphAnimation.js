// import Snap from "snapsvg";

const morphAnimation = (morphElem, svgElem, open = null) => {
  const morphEl = morphElem;
  const s = Snap(svgElem);
  const path = s.select("path");
  const initialPath = path.attr("d");
  const steps = morphEl.getAttribute("data-morph-open").split(";");
  const stepsTotal = steps.length;

  let isOpen;
  let isAnimating = false;

  if (open !== null) {
    isOpen = isOpen !== open ? open : isOpen;
  } else {
    isOpen = false;
  }

  console.warn(`menu open: ${isOpen}`);

  const animationMenu = () => {
    console.warn(`menu open: ${isOpen}`);
    if (isAnimating) return false;

    isAnimating = true;

    console.warn(`menu open: ${isOpen}`);

    if (isOpen) {
      // animate path
      setTimeout(() => {
        // reset path
        path.attr("d", initialPath);
        isAnimating = false;
      }, 1000);
    } else {
      // animate path
      var pos = 0,
        nextStep = pos => {
          if (pos > stepsTotal - 1) {
            isAnimating = false;
            return;
          }
          path.animate(
            { path: steps[pos] },
            pos === 0 ? 400 : 500,
            pos === 0 ? mina.easein : mina.elastic,
            function() {
              nextStep(pos);
            },
          );
          pos++;
        };

      nextStep(pos);
    }
    isOpen = !isOpen;
  };

  return animationMenu;
};

export default morphAnimation;
