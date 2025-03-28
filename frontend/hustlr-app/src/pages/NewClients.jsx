import { useState } from "react";

const NewClients = () => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="card bg-white shadow-lg rounded-xl border border-gray-200 p-6">
      <div className="card-body">
        <h2 className="text-2xl font-semibold text-[#422AD5] mb-4">Add New Client</h2>
        <div className="space-y-4">
          <div>
            <label className="label">Name</label>
            <input type="text" placeholder="Enter client name" className="input input-bordered w-full" />
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" placeholder="Enter client email" className="input input-bordered w-full" />
          </div>
          <div>
            <label className="label">Budget Range</label>
            <select className="select select-bordered w-full">
              <option value="low">$500 - $1,000</option>
              <option value="medium">$1,000 - $5,000</option>
              <option value="high">$5,000+</option>
            </select>
          </div>
          <div>
            <label className="label">Project Details</label>
            <textarea placeholder="Describe the project details" className="textarea textarea-bordered w-full"></textarea>
          </div>
          <div>
            <label className="label">Tags</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="input input-bordered w-full"
              />
              <button onClick={handleAddTag} className="btn btn-primary bg-[#422AD5] text-white">Add</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <div key={index} className="badge badge-primary gap-2 cursor-pointer" onClick={() => handleRemoveTag(tag)}>
                  {tag} ✕
                </div>
              ))}
            </div>
          </div>
          <button className="btn btn-primary w-full bg-[#422AD5] text-white mt-4">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default NewClients;
