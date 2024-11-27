type NoContactsProps = {
  message: string;
};

function NoContacts({ message }: NoContactsProps) {
  return (
    <div className="no-contacts-wrapper">
      <p>{message}</p>
    </div>
  );
}

export default NoContacts;
