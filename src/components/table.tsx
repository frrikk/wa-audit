import { Data } from "@/generated/types";
import Link from "next/link";

interface DataTableProps {
  data: Data[];
}

export const DataTable = ({ data }: DataTableProps) => {
  return (
    <ul>
      {data.map((item, index) => {
        return <TableRow key={index} {...item} />;
      })}
    </ul>
  );
};

const TableRow = (props: Data) => {
  return (
    <li>
      <div>
        <p>{props.url}</p>
        <div>
          <p>{props.accessibility_score}</p>
          <p>{props.performance_score}</p>
          <p>{props.best_practices_score}</p>
          <p>{props.seo_score}</p>
        </div>
      </div>
      <Link href={"#"}>Suggestions</Link>
    </li>
  );
};
