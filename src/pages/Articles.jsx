import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Articles() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", authorName: "" });
  const [editing, setEditing] = useState(null);

  const fetchPosts = async () => {
    const { data } = await api.get("/posts");
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await api.put(`/posts/${editing}`, form);
    } else {
      await api.post("/posts", form);
    }
    setForm({ title: "", content: "", authorName: "" });
    setEditing(null);
    fetchPosts();
  };

  const handleDelete = async (id) => {
    await api.delete(`/posts/${id}`);
    fetchPosts();
  };

  const handleEdit = (post) => {
    setForm({
      title: post.title,
      content: post.content,
      authorName: post.authorName
    });
    setEditing(post._id);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Articles</h2>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Author Name"
          value={form.authorName}
          onChange={(e) => setForm({ ...form, authorName: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editing ? "Update Post" : "Add Post"}
        </button>
      </form>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="border rounded p-4 shadow flex flex-col gap-2"
          >
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p>{post.content}</p>
            <p className="text-sm text-gray-600">By {post.authorName}</p>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(post)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
