export const WIPGear = () => {
  const size = 30;
  return (
    <div
      style={{ position: "fixed", left: 10, width: "60px" }}
      title="The site is still under construction."
    >
      <img
        src="/static/gear-2.png"
        title="The site"
        style={{
          animation: "spin 7s linear infinite",
          position: "fixed",
          width: `${size}px`,
          height: `${size}px`,
          marginLeft: `${size - 28}px`,
          marginTop: `${size - 25}px`,
        }}
      />
      <img
        src="/static/gear-2.png"
        title="construction"
        style={{
          animation: "spin 7s linear infinite",
          position: "fixed",
          width: `${size - 6}px`,
          height: `${size - 6}px`,
          marginLeft: `${size + 11}px`,
          marginTop: `${size - 7}px`,
        }}
      />
      <img
        src="/static/gear-2.png"
        title="is under"
        style={{
          animation: "spin 7s reverse  linear infinite",
          position: "fixed",
          width: `${size - 3}px`,
          height: `${size - 3}px`,
          marginLeft: `${size - 13}px`,
          marginTop: `${size - 4}px`,
        }}
      />
    </div>
  );
};
