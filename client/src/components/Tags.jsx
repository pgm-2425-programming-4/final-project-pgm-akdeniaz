import { useEffect, useState } from "react";
import { fetchTags } from "../data/fetchTags";

export default function Tags() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getTags = async () => {
      try {
        const fetchedTags = await fetchTags();
        setTags(fetchedTags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    getTags();
  }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold">Tags</h3>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>{tag.attributes.name}</li>
        ))}
      </ul>
    </div>
  );
}
