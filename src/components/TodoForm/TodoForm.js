import React, { useState } from "react";
import "./TodoForm.css";
import { FloatButton } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { DatePicker, Space } from "antd";
import { Button, Form, Input } from "antd";

const { RangePicker } = DatePicker;
export const TodoForm = ({ addTask }) => {
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onChange = (e) => {
    if (e == null) return;
    let tempDate = e.$D + "-" + (e.$M + 1) + "-" + e.$y;

    setDateValue(tempDate);
    // console.log(dateValue);
  };

  const taskHandler = (e) => {
    setTask(e.target.value);
    // console.log(task);
  };

  const descHandler = (e) => {
    setDesc(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let taskTemp = task.replace(/\s+/g, " ").trim();
    let descTemp = desc.replace(/\s+/g, " ").trim();
    if (
      taskTemp.length === 0 ||
      descTemp.length === 0 ||
      (taskTemp.length === 0 && descTemp.length === 0)
    )
      return;

    addTask(task, desc, dateValue);
    setTask("");
    setDesc("");
    setDateValue("");
    form.resetFields("");
    navigate("/");
  };
  return (
    <>
      <h1 className="todoHeading">Add Task</h1>
      <Form
        form={form}
        onSubmitCapture={handleSubmit}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item label="Task Title" name="task">
          <Input onChange={taskHandler} />
        </Form.Item>

        <Form.Item label="Description" name="Description">
          <Input onChange={descHandler} />
        </Form.Item>

        <Form.Item label="Select Date" name="Date">
          <Space direction="horizontal">
            <DatePicker
              className="datePicker"
              style={{ width: "12rem" }}
              onChange={onChange}
            />
          </Space>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Link to="/">
        <FloatButton />
      </Link>
    </>
  );
};
