interface NotesProps {
  title: string;
  content: string;
  wrapperStyle?: string;
  handleCancelClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const Notes = ({
  title,
  content,
  wrapperStyle,
  handleCancelClick
}: NotesProps) => (
  <div
    className={`max-h-72 overflow-y-auto rounded-md border p-3 ${wrapperStyle}`}
  >
    <div className="mr-4 flex justify-end">
      <button
        type="submit"
        onClick={(e: React.MouseEvent<HTMLElement>) => handleCancelClick(e)}
      >
        X
      </button>
    </div>
    <div className="font-semibold	">{title}</div>
    <div>{content}</div>
  </div>
);

export default Notes;
