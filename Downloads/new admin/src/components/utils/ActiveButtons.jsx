import React from 'react';

const styleMap = {
  primary: {
    active: 'bg-black-v1 text-white-v1 ',
    inactive: 'bg-white-v1 text-black-v1 ',
    common:"p-5 rounded-xl"
  },
  secondary: {
    active: 'text-black-v1',
    inactive: 'text-white-v3',
    common:"p-2"
  },
  danger: {
    active: 'bg-red-600 text-white',
    inactive: 'bg-white text-red-600 border border-red-600',
  },
};

const ActiveButtons = ({ buttons, className, active, setActive, type = 'primary' }) => {
  const { active: activeClass, inactive: nonActiveClass,common } = styleMap[type] || styleMap['primary'];

  return (
    <div className={`${className} flex gap-3 overflow-auto md:w-[calc(100vw-320px)] w-[calc(100vw-4rem)]`}>
      {buttons?.map((button, index) => (
        <button
          key={index}
          className={`${
            active === index ? activeClass : nonActiveClass
          }  ${common} w-full duration-300`}
          onClick={() => {
            setActive(index);
            button?.func && button.func();
          }}
        >
          {button.name}
        </button>
      ))}
    </div>
  );
};

export default ActiveButtons;
