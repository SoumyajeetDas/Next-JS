export type MessageType = {
  id: number;
  text: string;
};

type MessageComponentType = {
  messages: MessageType[];
};

const Messages: React.FC<MessageComponentType> = ({ messages }) => {
  return (
    <ul className="messages">
      {messages.map((message: MessageType) => (
        <li key={message.id}>{message.text}</li>
      ))}
    </ul>
  );
};

export default Messages;
