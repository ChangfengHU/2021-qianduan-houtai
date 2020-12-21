import React from 'react'
import {Button, Modal, Tooltip, message} from 'antd'
import {connect} from 'umi';
import styles from './style.less';

class ReactComponent extends React.Component {
  state = {
    dataSource: "222222",
    visible: false,
    articleId: 377
  }

  componentDidMount() {
    // this.request(this.props.articleId);
    console.log(this.props.match.params.articleId)
    const {dispatch} = this.props;
    const id = this.props.match.params.articleId
    dispatch({
      type: 'article/queryById',
      payload: {
        id: id,
      },
    });


  }

  request = (articleId) => {
    articleId = this.state.articleId
    const {dispatch} = this.props
    if (articleId == "" || articleId == null || articleId == undefined) {
      this.setState({
        dataSource: "",
      })
      this.insertHtml("")
      return;
    }
    axios.hcfajax({
      url: '/queryArticleById',
      data: {
        params: {
          id: articleId
        }
      }
    }).then((res) => {
      if (res && res.value) {
        this.setState({
          dataSource: res.value["content"]
        })
      }
      this.setState({
        articleId: this.state.articleId == 373 ? 374 : 373
      })
    })
  }

  onEditorClick = () => {
    this.setState({
      visible: !this.state.visible
    })
  }
  onChangeClick = () => {
    this.request(this.props.articleId);
  }

  render() {
    const {
      articleInfo: {content},
    } = this.props;
    console.log(content)
    return (
      <div>

        <div style={{float: "center"}}>
          <Tooltip placement="top" title="手机模式" key="1">
            <span className={styles.styleButton} style={{ color: "red"}}  ><svg onClick={this.onEditorClick} t="1567286904496" class="icon"
                                                          viewBox="0 0 1024 1024" version="1.1"
                                                          xmlns="http://www.w3.org/2000/svg" p-id="3514" width="20"
                                                          height="20"><path
              d="M544 910.336h-64a32 32 0 0 1 0-64h64a32 32 0 0 1 0 64zM560 192h-96a32 32 0 0 1 0-64h96a32 32 0 0 1 0 64zM816 800h-608a32 32 0 0 1 0-64h608a32 32 0 0 1 0 64z"
              p-id="3515"></path><path
              d="M784 1024h-544c-35.264 0-64-28.672-64-64V64c0-35.264 28.736-64 64-64h544c35.328 0 64 28.736 64 64v896a64 64 0 0 1-64 64z m0-64v32-32zM240 64v896h544V64h-544z"
              p-id="3516"></path></svg></span>
          </Tooltip>
          {/*<Tooltip placement="top" title="换一个" key="1">*/}
          {/*      <span className="RichEditor-styleButton"><svg onClick={this.onChangeClick} t="1567286904496"*/}
          {/*                                                    class="icon" viewBox="0 0 1024 1024" version="1.1"*/}
          {/*                                                    xmlns="http://www.w3.org/2000/svg" p-id="3514" width="200"*/}
          {/*                                                    height="200">*/}

          {/*      <path*/}
          {/*        d="M720.457326 586.971429a53.028571 53.028571 0 0 0-74.971429 74.971428l41.508572 41.508572H282.514469a176.822857 176.822857 0 0 1-176.64-176.64 211.748571 211.748571 0 0 1 33.462857-114.285715 52.845714 52.845714 0 1 0-89.051429-57.234285A316.342857 316.342857 0 0 0 0.000183 526.811429a282.88 282.88 0 0 0 282.514286 282.514285h398.994285l-36.571428 36.571429a53.028571 53.028571 0 0 0 74.971428 74.788571l129.097143-129.097143a52.845714 52.845714 0 0 0 0-74.788571z"*/}
          {/*        p-id="1676"></path><path*/}
          {/*        d="M741.485897 226.742857H307.200183l48.091428-48.091428a53.028571 53.028571 0 0 0-74.971428-74.788572l-129.097143 129.097143a52.845714 52.845714 0 0 0 0 74.788571l129.097143 129.097143a53.028571 53.028571 0 0 0 74.971428-74.788571l-29.44-29.44h415.634286a176.822857 176.822857 0 0 1 176.64 176.64 210.468571 210.468571 0 0 1-35.291428 116.845714 53.028571 53.028571 0 0 0 14.994285 73.142857 53.577143 53.577143 0 0 0 29.257143 8.777143 52.662857 52.662857 0 0 0 44.068572-23.771428A315.611429 315.611429 0 0 0 1024.000183 509.257143 282.88 282.88 0 0 0 741.485897 226.742857z"*/}
          {/*        p-id="1677"></path></svg>*/}

          {/*      </span>*/}
          {/*</Tooltip>*/}
        </div>
        {this.state.visible == false ?
          <span>
                <div className="RichEditor-right" style={{overflow: "auto"}}
                     dangerouslySetInnerHTML={{__html: content}}></div></span> :
          <Modal
            width={300}
            height={500}
            visible={this.state.visible}
            onCancel={() => {
              this.setState({
                visible: false
              })
            }}
            footer={null}
            header={null}
          ><span style={{position: "relative"}}>
          <div className={styles.EditViewInfo} style={{position: "absolute", zIndex: 10}}
               dangerouslySetInnerHTML={{__html: content}}></div>
            {<img src="https://articel.oss-cn-hangzhou.aliyuncs.com/iphon.png" alt=""
                  style={{zIndex: 1, width: '100%'}}/>}
        </span>
          </Modal>
        }


      </div>


    )
  }
}

export default connect(({article}) => (
  {
    articleInfo: article.articleInfo,
  }
))(ReactComponent)
