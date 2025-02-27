import { useEffect, useState } from "react";
import { addPost, deletePost, getPost } from "../api/PostApi";
import "../App.css";
import toast from "react-hot-toast";
import { Formik } from "formik";
import Form from "./Form";

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
  const addPostData = async (payload) => {
    try {
      const res = await addPost(payload);
      const u_data = [...data, payload]
      setData(u_data)
      toast.success("post added");
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

      <Formik
        initialValues={{ title: "", body: "" }}
        onSubmit={(values, { resetForm }) => {
          console.log("Form submitted", values);
          addPostData(values)
          resetForm();
        }}
      >
        {({ handleSubmit, values, handleChange, handleBlur }) => (
          <form className="input-section" onSubmit={handleSubmit}>
            <input
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="title"
            />
            <input
              type="text"
              name="body"
              value={values.body}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="body" />
            <button type="submit">ADD</button>
          </form>
        )}
      </Formik>



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
