import React, { useState } from "react";
import { Form, Input, DatePicker, Button, message } from "antd";
import axiosInstance from "@/services/api";

const Form7Application = () => {
  const [form] = Form.useForm();

  const [formData, setFormData] = useState({});
  console.log(formData);
  const handleSubmit = async ({ values }) => {
    try {
      const values = await form.validateFields();
      const finalData = { ...formData, ...values };
      console.log(values);
      console.log(finalData);

      const formattedData = {
        ...values,
        date: values.date.format("YYYY-MM-DD"),
        applicationDate: values.applicationDate.format("YYYY-MM-DD"),
        reviewerAppointedDate:
          values.reviewerAppointedDate.format("YYYY-MM-DD"),
        peerReviewCompletionDate:
          values.peerReviewCompletionDate.format("YYYY-MM-DD"),
        reportSubmissionDate: values.reportSubmissionDate.format("YYYY-MM-DD"),
      };

      const response = await axiosInstance.post("/formSeven", formattedData);
      message.success("Form submitted successfully!");
      form.resetFields();
    } catch (error) {
      message.error("Error submitting form. Please try again.");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item name="date" label="Date" rules={[{ required: true }]}>
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item name="firmName" label="Firm Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="frn" label="FRN" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="applicationNo"
        label="Application No"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="applicationDate"
        label="Application Date"
        rules={[{ required: true }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="reviewerAppointedDate"
        label="Reviewer Appointed Date"
        rules={[{ required: true }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="reasonsForDelay"
        label="Reasons for Delay"
        rules={[{ required: true }]}
      >
        <Input.TextArea rows={3} placeholder="Enter reasons for delay" />
      </Form.Item>
      <Form.Item
        name="additionalDaysRequested"
        label="Additional Days Requested"
        rules={[{ required: true }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        name="peerReviewCompletionDate"
        label="Peer Review Completion Date"
        rules={[{ required: true }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="reportSubmissionDate"
        label="Report Submission Date"
        rules={[{ required: true }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="partnerName"
        label="Partner Name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="partnerMembershipNo"
        label="Partner Membership No"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="reviewerName"
        label="Peer Reviewer Name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="reviewerMembershipNo"
        label="Peer Reviewer Membership No"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Form7Application;
