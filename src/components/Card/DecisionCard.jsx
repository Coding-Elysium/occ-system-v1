import { FaEdit, FaTrash } from "react-icons/fa";

export default function DecisionCard({
  title,
  titleNew,
  clickNew,
  data = [],
  onEdit,
  onDelete,
  onClickCard,
  mapper = (item) => ({
    title: item.decision,
    subtitle: `Remarks: ${item.remarks}`,
    date: item.date,
    icon: "D",
  }),
}) {
  return (
    <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">{title}</h1>
        </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
                <div onClick={clickNew} className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-50 cursor-pointer transition">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl text-gray-600">+</div>
                            <p className="text-sm font-medium text-gray-600">{titleNew}</p>
                        </div>
                    </div>

            {data.map((item, index) => {
            const { title, subtitle, date, icon } = mapper(item);

            return (
                <div
                    key={index}
                    onClick={() => onClickCard?.(item)}
                    className="flex flex-col gap-2 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow transition cursor-pointer bg-white"
                >
                {/* Header */}
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-lg">{icon}</div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-base font-semibold text-gray-800 truncate" title={title}>{title}</h2>
                            <p className="text-sm text-gray-500 truncate" title={subtitle}>{subtitle}</p>
                        </div>
                    </div>

                    <div className="text-sm text-gray-600">Date:{" "}
                        <span className="font-medium text-gray-800">{date}</span>
                    </div>

                {/* Actions */}
                <div className="flex gap-3 mt-2">
                    <button
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit?.(item);
                    }}
                    >
                    <FaEdit
                    size={16} />
                    </button>
                    <button
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete?.(item);
                    }}
                    >
                    <FaTrash size={16} />
                    </button>
                </div>
                </div>
            );
            })}
        </div>
      
    </section>
  );
}
