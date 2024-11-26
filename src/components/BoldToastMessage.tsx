type BoldToastMessageProps = {
  bold: string,
  text: string
}

function BoldToastMessage({ bold, text }: BoldToastMessageProps) {
  return (
    <p>
      <span className="bold">{bold + ' '}</span>
      {text}
    </p>
  );
}

export default BoldToastMessage;
