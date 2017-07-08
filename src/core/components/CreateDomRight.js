import React from 'react';
import ReactDOM from 'react-dom';
import UrlMixin from '../mixins/UrlMixin';
import classNames from 'classnames';
import ActionMenu from '../../widgets/Plus/actions/menu';
import CreateInfoTicket from './CreateInfoTicket';
import CreateControlButtons from './CreateControlButtons';
import StoreMenu from '../../widgets/Plus/stores/menu';
import Reflux from 'reflux';
import WrioDocument from '../store/WrioDocument.js';
import WrioDocumentActions from '../actions/WrioDocument.js';

// TODO: move to utils somewhere !!!!
export function replaceSpaces(str) {
    if (typeof str === "string") {
        return str.replace(/ /g, '_');
    } else {
        return str;
    }
}

function isCover(o) {
    return o.url && (typeof o.url === 'string') && (o.url.indexOf('?cover') === o.url.length - 6); // TODO: maybe regexp would be better, huh?
}

const hashEquals = (itemHash) => {
    var currentHash = window.location.hash.substring(1);
    return replaceSpaces(itemHash) === currentHash;
};

// abstract menu button

class MenuButton extends React.Component {

    onClick (e) {
        this.props.active(this);
        e.preventDefault();
    }
    constructor (props) {
        super(props);
        this.state =  {
            active: false
        };
    }
    componentWillMount () {
        if (this.props.isActive) {
            this.props.active(this);
        }
    }
    render () {
        var o = this.props.data,
            className = this.state.active ? 'active' : '',
            click = this.onClick.bind(this),
            href = replaceSpaces(o.url || '#'+ o.name || "#");
        return (
            <li className={className}>
              <a href={href} onClick={click} data-toggle="offcanvas">
                <span className="cd-dot"></span>
                <span className="cd-label">{o.name}</span>
              </a>
            </li>
        );
    }
}

MenuButton.propTypes = {
    data: React.PropTypes.object.isRequired,
    active: React.PropTypes.func.isRequired,
    isActive: React.PropTypes.bool.isRequired
};


class ExternalButton extends MenuButton {
    onClick (e) {
        this.props.active(this);
        console.log("External button clicked");
        WrioDocumentActions.external(this.props.data.url, this.props.data.name);
        super.onClick(e);
    }

    componentWillMount () {
        if (this.props.isActive) {
            this.props.active(this);
        }
        WrioDocumentActions.external(this.props.data.url, this.props.data.name, true, (url) => {
            this.setState({
                url: url
            });
        });
    }
}

class ArticleButton extends MenuButton{
    onClick (e) {
        this.props.active(this);
        console.log("Article button clicked");
        WrioDocumentActions.article(this.props.data.name, replaceSpaces(this.props.data.name));
        super.onClick(e);
    }
}

class CoverButton extends MenuButton {
    onClick (e) {
        console.log("Cover button clicked");
        WrioDocumentActions.cover(this.props.data.url, this.props.data.name);
        super.onClick(e);
    }
    componentWillMount () {
        if (this.props.isActive) {
            this.props.active(this);
        }
        WrioDocumentActions.cover(this.props.data.url, this.props.data.name, null, true);
    }
}

var CreateDomRight = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },

    mixins: [UrlMixin],

    active: function (child) {
        if (this.current) {
            this.current.setState({
                active: false
            });
        }
        this.current = child;
        this.current.setState({
            active: true
        });
        if (this.state.active) {
            ActionMenu.showSidebar(false);
        }
    },

    getInitialState: function () {
        return {
            active: false,
            resize: false,
            article: {},
            author: ''
        };
    },

    componentDidMount: function () {
        this.listenStoreMenuSidebar = StoreMenu.listenTo(ActionMenu.showSidebar, this.onShowSidebar);
        this.listenStoreMenuWindowResize = StoreMenu.listenTo(ActionMenu.windowResize, this.onWindowResize);
    },

    componentWillMount: function () {
        this.props.data.forEach((item) => {
            let o = item.data;
            if (o['@type'] === 'Article') {
                this.setState({
                    article: o,
                    author: o.author || ''
                });
            }
        });
    },

    onShowSidebar: function (data) {
        this.setState({
            active: data
        });
    },

    onWindowResize: function (width, height) {
        if (width > 767) {
            if (height < ReactDOM.findDOMNode(this.refs.sidebar)
                    .offsetHeight) {
                this.setState({
                    resize: true
                });
            }
        } else {
            this.setState({
                resize: true
            });
        }
    },

    componentWillUnmount: function () {
        this.listenStoreMenuSidebar();
        this.listenStoreMenuWindowResize();
    },

    render: function () {
        var className = classNames({
            '': true, /* removed "sidebar-offcanvas" */
            'active': this.state.active
        });

        var [coverItems,articleItems,externalItems] = this.getArticleItems();
        var height = this.getHeight();

        return (
            <div className={className} id="sidebar">
              <div ref="sidebar" className="sidebar-margin">
                <div className="hidden">
                  {this.state.article ? <aside>
                    <CreateInfoTicket article={this.state.article} author={this.state.author}/>
                  </aside> : ''}
                  {this.state.article ?
                    <CreateControlButtons article={this.state.article} author={this.state.author}/> : null}
                </div>
                { (coverItems.length > 0) ?
                  <ul className="nav nav-pills nav-stacked hidden" style={height}> {/* move to top of the page */}
                    {coverItems}
                  </ul>:""}
                { (articleItems.length > 0) ?
                  <nav className="contents visible-md-block visible-lg-block"> {/* add "navbar-fixed-top" and id="cd-vertical-nav" for small displays */}
                    <a href="#" data-toggle="tab">
                      <i className="material-icons dp_big invert-icon-v visib2le-xs-block">file_download</i>
                    </a>
                    <h1>Contents</h1>
                    <ul style={height}>
                      {articleItems}
                      <ArticleButton data={{name:"Comments",url:"#Comments"}}
                        active={this.active}
                        isActive={hashEquals('#Comments')}/>
                    </ul>
                  </nav>:""}
                { (externalItems.length > 0) ?
                  <ul style={height}>
                    {externalItems}
                  </ul>
                :""}
              </div>
            </div>
        );
    },

    getHeight() {
        if (window.innerWidth > 767) {
            return {
                height: 'auto'
            };
        } else {
            return {
                height: window.innerHeight - 52
            };
        }
    },

    processItem(item, superitem) {
        if (isCover(item)) {
            var isActive = this.listName === item.name.toLowerCase();
            if (this.listName === superitem.name) {
                this.coverItems.push(<CoverButton data={superitem} key={this.coverItems.length} active={this.active} isActive={isActive}/>);
            } else {
                this.coverItems.push(<CoverButton data={item} key={this.coverItems.length} active={this.active} isActive={isActive}/>);
            }
        } else {
            var isActive = this.listName === item.name.toLowerCase();
            this.externalItems.push(<ExternalButton data={item} key={this.externalItems.length} active={this.active} isActive={isActive}/>);
        }
    },

    initListName() {
        this.listName = WrioDocument.getListType();
        if (this.listName) {
            this.listName = this.listName.toLowerCase();
        }
    },

    getArticleItems() {

        var isActiveFirstArticle = true;

        this.coverItems= [];
        this.articleItems = [];
        this.externalItems = [];
        this.initListName();

        if (this.listName) {
            if (this.listName) {
                isActiveFirstArticle = false; // if we have ?list=cover parameter in command line, don't highlight first article
            }
        }
        var add = (currentItem) => {

            if (currentItem.hasElementOfType("Article")) {
                var isActive = hashEquals(currentItem.data.name) || isActiveFirstArticle;
                isActiveFirstArticle = false;
                this.articleItems.push(<ArticleButton data={currentItem.data} key={this.articleItems.length} active={this.active} isActive={isActive}/>);
            } else if (currentItem.getType() === 'ItemList') {
                if (!currentItem.hasElementOfType('ItemList')) {
                    this.processItem(currentItem.data, currentItem.data);
                } else {
                    currentItem.children.forEach((item) => this.processItem(item.data, currentItem.data), this);
                }
            }
            if (currentItem.hasPart()) { // recursively process all article parts
                currentItem.children.forEach(add, this);
            }
        };
        this.props.data.forEach(add);
        return [this.coverItems,this.articleItems,this.externalItems];
    }
});

export default CreateDomRight;
