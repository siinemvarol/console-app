import { Button, Col, Row, Space, Input } from "antd";
import React from "react";
import "./index.scss";

const PageLayout = ({ children, buttons }) => {

    const onSearch = (value) => {
        
    }

    const { Search } = Input;

  return (
    <Row className="page-layout">
      <Col>
        <Row>
          <Col flex="auto">
            <Space direction="vertical">
            <Search placeholder="Search..." onSearch={onSearch} enterButton style={{width: 400}} />
            </Space>
          </Col>
          <Col>
            {buttons.map((button) => {
              const { key, text, ...otherProps } = button;
              return (
                <Button key={key} {...otherProps}>
                  {text}
                </Button>
              );
            })}
          </Col>
        </Row>
      </Col>
      <Col>{children}</Col>
    </Row>
  );
};

export default PageLayout;
