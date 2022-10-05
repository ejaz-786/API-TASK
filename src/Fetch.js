import React, { useEffect, useState } from "react";
import { Page, Layout, Card } from "@shopify/polaris";
import { Select } from "@shopify/polaris";
import { Button } from "@shopify/polaris";
import { TextField } from "@shopify/polaris";
const Fetch = () => {
  const [fullData, setFullData] = useState([]);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [rendering, setRendering] = useState([]);
  const [addButtton, setAddButton] = useState([]);
  const [flag, setFlag] = useState(false);
  const [subCategory, setSubCategory] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [browserId, setBrowserId] = useState("");
  const [fullSecondDropDown, setfullSecondDropDown] = useState([]);
  const [subSelected, setSubSelected] = useState([]);
  const [selectedItem, setSelecteditem] = useState("");
  const [subData, setSubData] = useState([]);
  const [addingSelect,setAddingSelect]=useState([]);
  const [count,setCount]=useState([])

  const fetchData = async () => {
    let response = await fetch(
      "https://multi-account.sellernext.com/home/public/connector/profile/getAllCategory/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          appTag: "amazon_sales_channel",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjlkN2YwNDUxYzA3NGFhMGUxNWE4Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY0OTg4NjM3LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzM2Q3ZDlkYjgyM2I5MTVhMzc0NTA3NSJ9.eZKlcA00P9R_hw-ThPqMP1G_ntdht2hoh2Sx9FhfFXsw1725An17BDLLEA5GYGEXr-vtrUMoWq2E7_sRAkFvvbBrEljQenYRUH0VxIdgFvUk3ptoh9_x63ZhOpS2LhW0v5G16fZiY4StoArQZ3TVRrzqf9b5ZGVrlxh7RjR6oZEzLg6UHqPdYXn5o1J0FdoyCndaDo8y3XwNBPUJU1BqnVMxeYYFnYlxWCpH1jq8IjSrP1YSQARMZhAfqrxuN73utQMwf5EYR4_2fM8Iz-LiwN7wVkRkoj7hDTeQtVx_736tycu6f4lLf03CZ0mxzrbAXuifl3eJsHKso0lgL4UxPg`,
          "Ced-Source-Id": 500,
          "Ced-Source-Name": "shopify",
          "Ced-Target-Id": 530,
          "Ced-Target-Name": "amazon",
        },
        body: JSON.stringify({
          target_marketplace:
            "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
          selected: [...selectedOption],
          target: {
            marketplace: "amazon",
            shopId: "530",
          },
        }),
      }
    );
    let result = await response.json();
    setRendering([...rendering, result]);
    setFullData(result.data);
    setData([...data, result.data.map((i) => i.name)]);
  };

  const fetchAfterChildrenFalse = async () => {
    let response = await fetch(
      "https://multi-account.sellernext.com/home/public/connector/profile/getCategoryAttributes/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          appTag: "amazon_sales_channel",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjlkN2YwNDUxYzA3NGFhMGUxNWE4Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY0OTg4NjM3LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzM2Q3ZDlkYjgyM2I5MTVhMzc0NTA3NSJ9.eZKlcA00P9R_hw-ThPqMP1G_ntdht2hoh2Sx9FhfFXsw1725An17BDLLEA5GYGEXr-vtrUMoWq2E7_sRAkFvvbBrEljQenYRUH0VxIdgFvUk3ptoh9_x63ZhOpS2LhW0v5G16fZiY4StoArQZ3TVRrzqf9b5ZGVrlxh7RjR6oZEzLg6UHqPdYXn5o1J0FdoyCndaDo8y3XwNBPUJU1BqnVMxeYYFnYlxWCpH1jq8IjSrP1YSQARMZhAfqrxuN73utQMwf5EYR4_2fM8Iz-LiwN7wVkRkoj7hDTeQtVx_736tycu6f4lLf03CZ0mxzrbAXuifl3eJsHKso0lgL4UxPg`,
          "Ced-Source-Id": 500,
          "Ced-Source-Name": "shopify",
          "Ced-Target-Id": 530,
          "Ced-Target-Name": "amazon",
        },
        body: JSON.stringify({
          target_marketplace:
            "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
          selected: [...selectedOption],
          data: {
            barcode_exemption: false,
            browser_node_id: browserId,
            category: mainCategory,
            sub_category: subCategory,
          },
          source: {
            marketplace: "shopify",
            shopId: "500",
          },
          target: {
            marketplace: "amazon",
            shopId: "530",
          },
        }),
      }
    );
    let result = await response.json();
    setSubData(result.data);
    let b = result.data;
    let temp = [];
    for (const i in b) {
      for (const j in b[i]) {
        let a = { label: "", value: "", disabled: false };
        a.label = b[i][j].label;
        a.value = b[i][j].label;
        temp.push(a);
      }
    }
    setfullSecondDropDown([...fullSecondDropDown, temp]);
    setAddingSelect([...temp]);
  };

  // Calling fetch function
  useEffect(() => {
    fetchData();
  }, [selectedOption]);

  useEffect(() => {
    if(flag)
    {
      fetchAfterChildrenFalse()
    }
  }, [browserId]);

  const handleSelectChange = (value) => {
    setSelected([...selected, value]);
    fullData.map((i) => {
      if (i.name === value && i.hasChildren === true) {
        setSelectedOption(i.parent_id);
      } else if (i.name === value && i.hasChildren === false) {
        let subCategory = Object.entries(i.category);
        let mainCategory = Object.entries(i.category);
        setSubCategory(subCategory[0][1]);
        setMainCategory(mainCategory[1][1]);
        setBrowserId(i.browseNodeId);
        setFlag(true);
      }
      return 1;
    });
  };

  // Add Category
  const addCategory = () => {
    setCount([...count,1])
    // let temp = [];
    // addingSelect[subSelected.length-1].map((d) => {
    //  let z = d;
    //  if(z.value===selectedItem){
    //   z.disabled=true
    //  }
    //  temp.push(z)
    // });
    // setAddingSelect([...addingSelect,temp])
    // setfullSecondDropDown([...fullSecondDropDown, temp]);
  };

  // Delete Category
  const deleteCategory = (index) => {
    // alert(subSelected[index])
    addingSelect.map((d) => {
      let z = d;
      if(z.value===subSelected[index]){
       z.disabled=false
      }
     //  temp.push(z)
     });
     setAddingSelect([...addingSelect])
    count.splice(index,1)
    fullSecondDropDown.splice(index, 1);
    subSelected.splice(index, 1);
    setfullSecondDropDown([...fullSecondDropDown]);
    setSubSelected([...subSelected]);
    setCount([...count])
  };
  // subcategory disabling
  const subhandleSelectChange = (value) => {
    setSelecteditem(value);
    setSubSelected([...subSelected, value]);
    addingSelect.map((d) => {
     let z = d;
     if(z.value===value){
      z.disabled=true
     }
    //  temp.push(z)
    });
    setAddingSelect([...addingSelect])
  };

  return (
    <>
      <Page Width>
        <Layout>
          <Layout.Section>
            {rendering.map((i, index) => {
              return (
                <>
                  <Card sectioned>
                    <Select
                      placeholder="Select"
                      key={index}
                      options={data[index]}
                      onChange={handleSelectChange}
                      value={selected[index]}
                    />
                  </Card>
                </>
              );
            })}
            {count.map((i, index) => {
              return (
                <>
                  <Card sectioned>
                    <span className="delete_button">
                      <Button onClick={() => deleteCategory(index)}>
                        Delete
                      </Button>
                    </span>

                    <Select
                      placeholder="Select"
                      options={addingSelect}
                      onChange={subhandleSelectChange}
                      value={subSelected[index]}
                    />

                    <TextField placeholder="Enter text" autoComplete="off" />
                  </Card>
                </>
              );
            })}
            {flag ? (
              <Button primary onClick={addCategory}>
                Add product
              </Button>
            ) : (
              ""
            )}
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};
export default Fetch;