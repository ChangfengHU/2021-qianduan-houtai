import {PlusOutlined} from '@ant-design/icons';
import {Button, Divider, message, Input, Drawer,Alert, Form ,Select,Popover} from 'antd';
import React, {useState, useRef, useEffect} from 'react';
import {PageContainer, FooterToolbar} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import {updateArticle, addArticle, removeArticle} from './service';
import { connect } from 'umi';
import {Util as Utils} from "@/utils/utils";
import styles from './style.less';
import { history } from 'umi';
/**
 * 添加节点
 * @param fields
 */

const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await addArticle({...fields});
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async (fields) => {
  const hide = message.loading('正在配置');

  try {
    await updateArticle({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeArticle({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

export const TableList = (props) => {

  const {
    dispatch,
    article,
    total,
  } = props;
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const [row, setRow] = useState();
  const [demo, setDemo] = useState(1);

  // useEffect(() => {
  //   // console.log(article)
  //   dispatch({
  //     type: 'article/queryArticle',
  //     payload: {
  //       pageSize: 10,
  //       current: 1,
  //     },
  //   },[1]);
  // });
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      tip: 'id是唯一的 key',
      hideInSearch:true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '规则名称为必填项',
          },
        ],
      },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: '文章标题',
      dataIndex: 'title',
      valueType: 'textarea',
    },
    {
      title: '文章内容',
      dataIndex: 'content',
      // valueType: 'textarea',
      render: (dom, entity) => {
        // console.log(dom)
        // console.log(entity)
        let content=entity.content
        content=formatContentHeader(content)
        if (content) {
          let html = Utils.unEscape(content);
          const popover = (

            <span className="articleCard" style={{position:"relative",left:100}}>
             <div className={styles.EditView1} style={{position:"absolute",zIndex:10,height:447}} dangerouslySetInnerHTML={{__html:content.trim()}}></div>
              {<img src="https://articel.oss-cn-hangzhou.aliyuncs.com/iphon.png" alt="" style={{zIndex:1,  width: '60%' }} />}
            </span>

          )
          return (
            <div >
              <Popover style={{zIndex:1,  width: '60%' }}   trigger="click" placement="topLeft" content={popover}>
                {html && html.length > 300 ? html.substring(0, 80) + "..." : html}
              </Popover>
            </div>

          )
          // trigger="click"
        } else {
          return content;
        }
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      // key: 'action',
      width: 180,
      render: (_, record) => (

        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);


              setStepFormValues(record);
            }}
          >
            查看文章
          </a>
          <Divider type="vertical" />

          <Button type="primary" onClick={() => {
            console.log(record)
            const id = record.id;
            history.push(`article/${id}`);
            // history.push('/articleView/${id}')}
          }
          }>
            Back Home
          </Button>
        </>
      ),
    },
  ];

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 10,
    total: total,
  };

//格式化代码   Ctrl+Alt+l  <p>&nbsp;</p>
  const formatContentHeader = (content) => {
    if (!content){
      return content
    }
    if (content.startsWith("<p>&nbsp;</p>")){
      content=content.substring(13,content.length).trim()
      return formatContentHeader(content)
    }
    if (content && (content.startsWith("<p></p>"))){
      content=content.substring(7,content.length).trim()
      return formatContentHeader(content)
    }
    return content
  }

  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        // actionRef={actionRef}
        rowKey="id"
        // search={{
        //   labelWidth: 120,
        // }}

        dateFormatter="string"
        search={{
          filterType: 'light',
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 新建
          </Button>,
        ]}
        bordered
        request={(params, sorter, filter) =>
          dispatch({
              type: "article/queryArticle",
              payload: {...params, sorter, filter}
            })
        }

        // request={(params = {}) =>
        //   Promise.resolve({
        //     data: props.article,
        //   })
        // }
        dataSource={article}
        pagination={paginationProps}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) =>
        //   {
        //     console.log(selectedRows)
        //     return setSelectedRows(selectedRows)}
        //   ,
        // }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项&nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
          onSubmit={async (value) => {
            const success = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);

            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

// export default TableList;
export default connect(({ article }) => (
  {
    article: article.article,
    total: article.total
  }
))(TableList);
