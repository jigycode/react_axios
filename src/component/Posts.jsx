import { useEffect, useState } from "react";
import { addPost, deletePost, getPost, updatePost } from "../api/PostApi";
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


  const [updateDataApi, setUpdateDataApi] = useState({
    title: "",
    body: "",
    id: "",
  });

  const handleUpdatePost = (curElem) => {
    setUpdateDataApi({
      title: curElem.title,
      body: curElem.body,
      id: curElem.id,
    });
  };
  // useEffect(() => {
  //   updateDataApi = { updateDataApi }
  //   setUpdateDataApi = { setUpdateDataApi }
  //   updateDataApi &&
  //     setUpdateDataApi({
  //       title: updateDataApi.title || "",
  //       body: updateDataApi.body || "",
  //     });
  // }, [updateDataApi]);

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
        initialValues={{ title: updateDataApi.title, body: updateDataApi.body }}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          if (updateDataApi.id) {
            updatePost(updateDataApi.id, values);
            const u_data = data.map((ele) => {
              if (ele.id === updateDataApi.id) {
                return { ...ele, ...values };
              }
              return ele;
            });
            setData(u_data);
            setUpdateDataApi({ title: "", body: "", id: "" });
            toast.success("updated successfully!");
            console.log("update");
          } else {
            console.log("Form submitted", values);
            addPostData(values)
            resetForm();

          }
        }}
      >
        {({ handleSubmit, values, handleChange, handleBlur, setValues }) => (
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
            <button type="submit">{updateDataApi.id ? "update" : "Add"}</button>
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
                <button onClick={() => handleUpdatePost(curElem)}>Edit</button>
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
