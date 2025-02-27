import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi";
import "../App.css";
import toast from "react-hot-toast";

export const Posts = () => {
  const [data, setData] = useState([]);

  const getPostData = async () => {
    try {
      const res = await getPost();
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching posts");
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      const u_data = data.filter((ele) => ele.id !== id);
      setData(u_data);
      toast.success("deleted successfully!");
      console.log(res);
    } catch (error) {
      console.error(error);
      toast.error("error in network");
    }
  };

  return (
    <div className="container">
      <form className="input-section">
        <input type="text" placeholder="Enter Title" />
        <input type="text" placeholder="Enter Body" />
        <button>ADD</button>
      </form>

      <section className="section-Post">
        <ul>
          {data.map((curElem) => {
            const { id, body, title } = curElem;
            return (
              <li key={id}>
                <p>Title: {title}</p>
                <p>Body: {body}</p>
                <button>Edit</button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeletePost(id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};
