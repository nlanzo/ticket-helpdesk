import { addTicket } from "../actions";

// components
import SubmitButton from "../../../components/SubmitButton";

export default function CreateForm() {
  return (
    <form className="w-1/2" action={addTicket}>
      <label>
        <span>Title:</span>
        <input name="title" type="text" required />
      </label>
      <label>
        <span>Body:</span>
        <textarea name="body" required></textarea>
      </label>
      <label>
        <span>Priority:</span>
        <select name="priority">
          <option value="low">Low priority</option>
          <option value="medium">Medium priority</option>
          <option value="high">High priority</option>
        </select>
      </label>
      <SubmitButton />
    </form>
  );
}
