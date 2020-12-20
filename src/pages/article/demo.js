import React from 'react'
import {Card, Button, Table, Menu, Divider, message, Modal, Dropdown, Alert, Form, Select, Popover} from 'antd'

class ReactComponent extends React.Component {
  handleArticleEdit;
  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      }, {
        title: '更改时间',
        width: 165,
        dataIndex: 'gmtTime'

      }, {
        title: '作者',
        width: 100,
        dataIndex: 'author',
      }, {
        title: '图标',
        width: 30,
        key: 'avatar',
        dataIndex: 'avatar',
        render: (content, obg) => {
          // if (!content || content == "undefined" || content == undefined || content.trim() == "") {
          //   content = "https://articel.oss-cn-hangzhou.aliyuncs.com/1.jpg"
          // }
          // let html = Utils.buildImage(content, content, "article");
          // const popover = (
          //   <Alert
          //     description={<div dangerouslySetInnerHTML={{__html: html}}></div>}
          //     type="info"
          //   />
          // )
          // return (
          //   <Popover placement="topLeft" content={popover}>
          //     <div dangerouslySetInnerHTML={{__html: html}}></div>
          //   </Popover>
          // )
        }
      }
      , {
        title: '文章标题',
        width: 200,
        dataIndex: 'title'
      },
      {
        title: '文章内容',
        key: 'content',
        dataIndex: 'content',
        render: (content, obg) => {
          // content = this.formatContentHeader(content)
          // if (content) {
          //   let html = Utils.unEscape(content);
          //   const popover = (
          //
          //     <span className="articleCard" style={{position: "relative", left: 100}}>
          //    <div className="EditView1" style={{position: "absolute", zIndex: 10, height: 447}}
          //         dangerouslySetInnerHTML={{__html: content.trim()}}></div>
          //       {<img src="https://articel.oss-cn-hangzhou.aliyuncs.com/iphon.png" alt=""
          //             style={{zIndex: 1, width: '60%'}}/>}
          //   </span>
          //
          //   )
          //   return (
          //     <div>
          //       <Popover style={{zIndex: 1, width: '60%'}} trigger="click" placement="topLeft" content={popover}>
          //         {html && html.length > 300 ? html.substring(0, 80) + "..." : html}
          //       </Popover>
          //     </div>
          //
          //   )
          //   // trigger="click"
          // } else {
          //   return content;
          // }
        }
      },

      {
        title: "编辑",
        key: 'action',
        width: 250,
        render: (item, record) => {
          // console.log(item)
          const menu = (
            <Menu>
              <Menu.Item onClick={() => this.onDelete([item.id], item)}>删除</Menu.Item>
            </Menu>
          );
          return (
            <div>
              <Button size="small" onClick={() => {
                this.handleArticleEdit(record)
              }}>
                <Link to={`/edit/${record.id}`}>
                  内容编辑
                </Link>
              </Button>
              <Button style={{marginLeft: 10}} size="small" onClick={() => {
                this.handleEdit(record)
              }}>修改</Button>

              {/*<a*/}
              {/*onClick={e => {*/}
              {/*}}*/}
              {/*href="javascript:;"*/}
              {/*>*/}
              {/*编辑*/}
              {/*</a>*/}

              {/* //一期不做
               <Divider type="vertical" />
               <a href="javascript:;">{formatMessage({ id: 'knowledge.offline' })}</a> */}
              <Divider type="vertical"/>
              <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter">
                <Button size="small"> <a href="javascript:;"> 更多</a></Button>

              </Dropdown>
            </div>
          )
        },
      },
    ]

    const formList = [
      {
        type: "INPUT",
        label: "id",
        field: "id",
        placeholder: "请输入id",
      },
      {
        type: "INPUT",
        label: "作者",
        field: "author",
        placeholder: "请输入作者",
      },
      {
        type: "INPUT",
        label: "标题",
        field: "title",
        placeholder: "请输入标题",
      },
      {
        type: "INPUT",
        label: "内容",
        field: "content",
        placeholder: "请输入内容",
      },
    ]
    return (
      <div>
        <Card>
          {/*<BaseForm*/}
          {/*  formList={formList}*/}
          {/*  filterSubmit={this.onRef}></BaseForm>*/}
        </Card>
        <Card style={{marginTop: 10}}>
          <Button type="primary" onClick={this.handleArticleEdit}>
            {/*<Link to="/edit">*/}
            {/*  新增文章*/}
            {/*</Link>*/}
          </Button>
        </Card>

        <div>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={this.state.pagination}
          />
        </div>
        <EditArticle
          visible={this.state.visible}
          setVisible={this.setVisible}
          setRequest={this.request}
        />
      </div>
    )
  }


}
export default ReactComponent;
