import uuid from "react-uuid";
import React from "react";
import { List, Card } from "antd";
import { FloatButton } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./TodoWrapper.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

export const TodoWrapper = ({ tasks, setTasks }) => {
  const addTask = async (task, desc, dateValue) => {
    setTasks([
      ...tasks,
      {
        id: uuid(),
        todo: task,
        desc: desc,
        dateValue: dateValue,
      },
    ]);
  };

  //edit task
  const editHandler = (event, taskDesc) => {
    let updatedTask = prompt();
    let updatedDesc = prompt();
    if (updatedTask == null) return;
    if (updatedDesc == null) return;

    updatedTask = updatedTask.replace(/\s+/g, " ").trim();
    updatedDesc = updatedDesc.replace(/\s+/g, " ").trim();
    if (updatedTask.length === 0) return;
    if (updatedDesc.length === 0) updatedDesc = taskDesc;

    const temp = [];
    {
      tasks.map((val) => {
        if (val.id === event) {
          temp.push({
            id: val.id,
            todo: updatedTask,
            desc: updatedDesc,
            dateValue: val.dateValue,
          });
        } else {
          temp.push({
            id: val.id,
            todo: val.todo,
            desc: val.desc,
            dateValue: val.dateValue,
          });
        }
      });
      setTasks(temp);
    }
  };

  //delete task
  const deleteHandler = (event) => {
    const temp = [];
    {
      tasks.map((val) => {
        if (val.id !== event) {
          temp.push({
            id: val.id,
            todo: val.todo,
            desc: val.desc,
            dateValue: val.dateValue,
          });
        }
      });
      return setTasks(temp);
    }
  };

  return (
    <>
      <h1 className="todoHeading">Todo List</h1>

      <div
        id="scrollableDiv"
        style={{
          overflow: "auto",
          width: "69vw",
          height: "70vh",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <InfiniteScroll dataLength={tasks.length}>
          <List
            dataSource={tasks}
            renderItem={(tasks) => (
              <Card
                key={tasks.id}
                type="inner"
                style={{
                  marginTop: "1rem",
                  paddingBottom: "1rem",
                }}
                title={
                  <h2>
                    {tasks.todo}{" "}
                    <EditOutlined
                      style={{
                        marginRight: "5px",
                        color: "blue",
                        marginLeft: "1rem",
                      }}
                      onClick={() => editHandler(tasks.id, tasks.desc)}
                    />
                    <DeleteOutlined
                      style={{ marginRight: "4px", color: "red" }}
                      onClick={() => deleteHandler(tasks.id)}
                    />
                  </h2>
                }
              >
                {tasks.dateValue && (
                  <>
                    <p
                      style={{
                        color: "black",
                        fontSize: "1rem",
                      }}
                    >
                      <b> {"Date:"}</b>
                      <span style={{ paddingRight: "1rem" }}>
                        {tasks.dateValue}
                      </span>
                    </p>
                  </>
                )}
                <p
                  style={{
                    color: "black",
                    fontSize: "1rem",
                  }}
                >
                  {tasks.desc}
                </p>
              </Card>
            )}
          />
        </InfiniteScroll>
        <Link to="todoform">
          <FloatButton icon={<PlusOutlined />} />
        </Link>
      </div>
    </>
  );
};
