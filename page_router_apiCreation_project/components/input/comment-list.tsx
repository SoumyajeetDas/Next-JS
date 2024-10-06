import classes from './comment-list.module.css';

const CommentList: React.FC<{
  items: { _id: string; name: string; text: string }[];
}> = ({ items }) => {
  return (
    /* Render list of comments - fetched from API */

    <ul className={classes.comments}>
      {items.map((item) => (
        <li key={item._id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
