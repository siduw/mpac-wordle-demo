function LetterBox({ letter, score }) {
  let color = ''
  if (score === 1) {
    color = "bg-yellow-400 ";
  } else if (score === 2) {
    color = "bg-green-400";
  } else if (score == 0) {
    color = "bg-slate-400 ";
  } else 
  {
    color = "bg-slate-100 ";
  }
  return (
    <div className={"flex justify-center items-center size-20 border m-2 bold uppercase " + color}>{letter}</div>
  );
}

export default LetterBox;
