import React, { useState } from "react";
import { Dropdown, Menu, Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";

const FilterButton: React.FC<{ onFilter: (filter: string) => void }> = ({
  onFilter,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleFilter = (filter: string) => {
    setSelectedFilter(filter);
    onFilter(filter);
  };

  const menu = (
    <Menu onClick={({ key }) => handleFilter(key)}>
      <Menu.Item key="demandees">Demande en cours</Menu.Item>
      <Menu.Item key="acceptees">Accepté</Menu.Item>
      <Menu.Item key="refusees">Refusé</Menu.Item>
      <Menu.Item key="activees">En cours de stage</Menu.Item>
      <Menu.Item key="archivees">Archivé</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Button
        type="text"
        icon={<FilterOutlined />}
        onClick={(e) => e.preventDefault()}
      ></Button>
    </Dropdown>
  );
};

export default FilterButton;
