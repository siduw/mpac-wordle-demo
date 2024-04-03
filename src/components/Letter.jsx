function Letter({ letter, score }) {
  const colorMap = {
    0: "bg-slate-400",
    1: "bg-yellow-400",
    2: "bg-green-400",
  };

  // DEFAULT
  const color = colorMap[score] || "bg-slate-100";

  return (
    <div
      className={`flex justify-center items-center size-10 border m-2 bold uppercase ${color}`}
    >
      {letter}
    </div>
  );
}

export default Letter;
