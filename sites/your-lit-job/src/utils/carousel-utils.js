import breakpoints from './breakpoints';

const lerp = (x, y, a) => x * (1 - a) + y * a;

const getAngle = (x2, y2, { x1 = 0.5, y1 = 0.5 }) => {
  const rawAngle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI) + 90;
  return rawAngle;
};

const getDecimal = (number = 0) => {
  return Math.round((number + Number.EPSILON) * 100) / 100;
};

const getGradient = (opacity = 0, percent = 0, color = '255, 255, 255') => {
  return `rgba(${color}, ${opacity}) ${percent}%`;
};

const getBgLinear = (degrees = 0, shine = 0) => {
  return {
    // eslint-disable-next-line prettier/prettier
    background: `linear-gradient(${degrees}deg, ${getGradient(shine)}, ${getGradient(shine, 5)}, ${getGradient(0, 80)})`,
  };
};

const currencyFormaterUSD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

const getHighlightsFrJob = (job) => {
  return [
    {
      id: 'highlight-annualPay-0',
      title: 'Median (Middle) Salary:',
      value: currencyFormaterUSD.format(job?.annualPay),
      className: `salary`,
    },
    {
      id: 'highlight-levelEducation-1',
      title: 'You Should Study:',
      value: job?.levelEducation,
      className: `education`,
    },
    {
      id: 'highlight-jobOutlook-2',
      title: 'Job Growth Rate by 2030:',
      value: job?.jobOutlook,
      className: `chart`,
    },
    {
      id: 'highlight-thisJobIs-3',
      title: 'This Job Is:',
      value: Number(job.thisJobIs) || 0,
      className: `heat`,
    },
  ];
};

const resetOrder = (oldOrder, max) => {
  if (oldOrder < 0) {
    const roundValue = Math.ceil(Math.abs(oldOrder) / max) * max;
    return roundValue + oldOrder;
  }
  return oldOrder % max;
};

const getMinimalItems = (items) => {
  if (!(items?.length > 0)) return [];
  const oneList = [];

  do {
    oneList.push(...items);
  } while (oneList.length < 5 && items.length > 0);

  const response = oneList.map((oneItem, index) => {
    const key = `oneItem-${oneItem?.id || ''}-${index}`;
    return { oneItem, key };
  });

  return response;
};

const shiftChildNodesFrReference = (ref, { left = false, right = false }) => {
  if (left && ref?.current) {
    ref.current.insertBefore(ref.current.lastChild, ref.current.childNodes[0]);
  } else if (right && ref?.current) {
    ref.current.appendChild(ref.current.firstChild);
  }
};

const getContainerWidth = () => {
  let containerWidth = window.innerWidth;
  if (window.matchMedia(breakpoints.md).matches) containerWidth -= 150;
  if (window.matchMedia(breakpoints.lg).matches) containerWidth -= 320;
  return containerWidth;
};

export {
  lerp,
  getAngle,
  getDecimal,
  getBgLinear,
  getHighlightsFrJob,
  resetOrder,
  shiftChildNodesFrReference,
  getMinimalItems,
  getContainerWidth,
};
