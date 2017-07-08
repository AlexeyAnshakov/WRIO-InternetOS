require('babel-polyfill');
require('es6-symbol/implement'); // FOR IE support for of iterators
import React from 'react';
import ReactDOM from 'react-dom';
import CreateDomLeft from './core/components/CreateDomLeft';
import CreateDomRight from './core/components/CreateDomRight';
import {CreateDomCenter, TransactionsCenter, PresaleCenter, ChessCenter, CoreCreateCenter, WebGoldCenter} from './core/components/CreateDomCenter';
import {getServiceUrl,getDomain} from './core/servicelocator.js';
import sendHeight  from './core/components/WindowDimensions';
import LdJsonManager from './core/jsonld/scripts';
import domready from 'domready';
import WindowActionStore from './core/store/WindowMessage.js';
import UrlMixin from './core/mixins/UrlMixin.js';
import Lockup from './core/components/Lockup.js';
import {Plus,Users} from "./widgets/Plus/Plus";
//import { Router, Route, Link } from 'react-router';
import WrioDocumentActions from './core/actions/WrioDocument.js';
import WrioDocumentStore from './core/store/WrioDocument.js';
import UIActions from './core/actions/UI.js';

/*
import Perf from 'react-addons-perf';
window.Perf = Perf;
Perf.start();*/


export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url:  UrlMixin.searchToObject(),
            showLockup: false,
            data: WrioDocumentStore.getDocument()
        };
    }

    listener () {
        UIActions.showLockup.listen((data) => {
            this.setState({
                showLockup:data
            });
        });
        this.wrioStore = WrioDocumentStore.listen(this.onDocumentChange.bind(this));

    }

    componentDidMount() {
        // hide preloader
        this.listener();
        sendHeight();
        document.getElementById('preloader') ? document.getElementById('preloader').style.display = 'none' : true;
    }

    componentWillUnmount() {
        this.wrioStore();
    }

    onDocumentChange(doc) {
        this.setState({
           url:  UrlMixin.searchToObject(),
           changed: true
        });
    }

    render() {

        if (this.state.url.start && (window.location.origin === getServiceUrl('chess'))) {
            return this.renderWithCenter(<ChessCenter  data={this.state.data} />);
        }

        if (this.state.url.transactions) {
           return this.renderWithCenter(<TransactionsCenter  data={this.state.data}/>);
        }

        if (this.state.url.presale && (window.location.hostname.startsWith('webgold.wrioos.') || window.location.hostname.startsWith('wrioos.local'))) {
            return this.renderWithCenter(<PresaleCenter  data={this.state.data}/>);
        }

        if (this.state.url.create) {
            return this.renderWithCenter(<CoreCreateCenter data={this.state.data} />);
        }

        if (this.state.url.add_funds) {
            return this.renderWithCenter(<WebGoldCenter data={this.state.data} />);
        }

        if (this.state.showLockup) {
            return this.renderWithCenter(<Lockup data={this.state.data}/>, <Users />);
        }

        return this.renderWithCenter(<CreateDomCenter data={this.state.data} />);
    }

    renderWithCenter(center,plus) {
        var plus = plus || (<Plus />);
        var data = WrioDocumentStore.getData();
        return (
          <div>

            {/*<a href="#" className="dashboard btn btn-just-icon btn-primary btn-lg">
              <i className="material-icons dp_big">apps</i>
            </a>*/}
            <div className="right-nav">
              <a href="#" className="btn btn-just-icon btn-simple btn-default btn-lg"><i className="material-icons dp_big">highlight_off</i></a>
              <a href="#" className="hidden btn btn-just-icon btn-simple btn-default btn-lg"><i className="material-icons dp_big">bookmark</i></a>
              <a href="#" className="hidden btn btn-just-icon btn-simple btn-default btn-lg"><i className="material-icons dp_big">share</i></a>
            </div>
            {/*<nav className="dashboard">
              <a className="navbar-brand" href="#"><i className="material-icons dp48">apps</i> Dashboard<div className="ripple-container"></div></a>
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#example-navbar-transparent">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </nav>*/}

            <div className="page-header">
              <div className="cover col-xs-8 col-xs-offset-2 col-lg-9 col-lg-offset-3">
                <div className="cover-left">
                  <div className="card card-profile card-plain">
                    <div className="card-image">
                      <a href="#" className="img">
                        <img src="https://default.wrioos.com/img/logo.png" />
                      </a>
                    </div>
                    <div className="hidden">
                      <a href="#" className="author">By User Name</a>
                      <h6>Followers: 188</h6>
                    </div>
                  </div>
                </div>
                {/*<div className="cover-right">
                  <div className="card card-profile card-plain">
                    <div className="card-image">
                      <a href="#">
                        <img className="img" src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAA2tAAAAJDMxMTViYTgyLTg2NDQtNDYxNy1hZWFmLTA4YzQ1ZDI4N2ZhNw.jpg" />
                      </a>
                    </div>
                    <div className="card-content">
                      <h4 className="card-title">By Alexey Anshakov</h4>
                    </div>
                  </div>
                </div>*/}
                <nav className="navbar navbar-transparent">
                  <ul className="nav navbar-nav navbar-left">
                    <li>
                      <a href="#profile" className="active" data-toggle="tab">
                        Cover
                        <div className="ripple-container"></div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Offer
                        <div className="ripple-container"></div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Tutorial
                        <div className="ripple-container"></div>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="card card-carousel" data-parallax="true">
                <div id="carousel-header" className="carousel slide" data-ride="carousel">
                  <div className="carousel slide" data-ride="carousel">

                    <div className="carousel-indicators">
                      <ol className="col-xs-8 col-xs-offset-2 col-lg-9 col-lg-offset-3">
                        <li data-target="#carousel-header" data-slide-to="0" className=""></li>
                        <li data-target="#carousel-header" data-slide-to="1" className="active"></li>
                        <li data-target="#carousel-header" data-slide-to="2" className=""></li>
                      </ol>
                    </div>

                    <div className="carousel-inner">
                      <div className="header-filter cover-bg item active">
                        <div className="carousel-caption">
                          <div className="row">
                            <div className="col-xs-8 col-xs-offset-2 col-lg-9 col-lg-offset-3">
                              <div className="title">
                                <div className="title-text">
                                  <h1>Cosmos</h1>
                                  <h3>Cosmos: A Spacetime Odyssey is a 2014 American science documentary television series. The show is a follow-up to the 1980 television series ', which was presented by Carl Sagan on the Public Broadcasting Service and is considered a milestone for scientific documentaries.</h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <a className="left carousel-control" href="#carousel-header" data-slide="prev">
                      <i className="material-icons">keyboard_arrow_left</i>
                    </a>
                    <a className="right carousel-control" href="#carousel-header" data-slide="next">
                      <i className="material-icons">keyboard_arrow_right</i>
                    </a>
                  </div>
                </div>


              </div>
            </div>


            {/*
              <div className="page-header header-filter cover-bg col-xs-12" data-parallax="true">
              <div className="cover col-xs-12 col-sm-8 col-sm-offset-2 col-lg-6 col-lg-offset-3">
                <nav className="navbar navbar-transparent">
                  <ul className="nav navbar-nav navbar-left">
                    <li>
                      <a href="#profile" className="active" data-toggle="tab">
                        Cover
                        <div className="ripple-container"></div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Offer
                        <div className="ripple-container"></div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Tutorial
                        <div className="ripple-container"></div>
                      </a>
                    </li>
                  </ul>
                </nav>
                <div className="title">
                  <div className="title-text">
                    <h1>Cosmos</h1>
                    <h3>Cosmos: A Spacetime Odyssey is a 2014 American science documentary television series. The show is a follow-up to the 1980 television series ', which was presented by Carl Sagan on the Public Broadcasting Service and is considered a milestone for scientific documentaries.</h3>
                    <a href="#" className="btn btn-primary btn-raised btn-lg">
                      <i className="material-icons">play_arrow</i>Watch video
                      <div className="ripple-container"></div></a>
                  </div>
                </div>
              </div>
              </div>
            */}

            <div className={'hidden row row-offcanvas row-offcanvas-right'}>
              <CreateDomLeft list={plus} />
            </div>
            <div className="col-sm-3">
              <CreateDomRight data={data} />
            </div>
            <div className="main col-xs-12 col-sm-10 col-sm-offset-1 col-md-9 col-md-offset-0 col-lg-9">
              <div className="card card-nav-tabs">
                <div className="header header-primary">
                  <div className="nav-tabs-navigation">
                    <div className="nav-tabs-wrapper">
                      <ul className="nav nav-tabs" data-tabs="tabs">
                        <li className="active">
                          <a href="#home" data-toggle="tab">
                            <i className="material-icons dp_big visible-xs-block">home</i>
                            <span className="hidden-xs">Home</span>
                            <div className="ripple-container"></div>
                          </a>
                        </li>
                        <li>
                          <a href="#collections" data-toggle="tab">
                            <i className="material-icons dp_big visible-xs-block">folder</i>
                            <span className="hidden-xs">Collections</span>
                            <div className="ripple-container"></div>
                          </a>
                        </li>
                        <li>
                          <a href="#read_later" data-toggle="tab">
                            <i className="material-icons dp_big visible-xs-block left">watch_later</i>
                            <span className="hidden-xs">Read later</span> <label>4</label>
                            <div className="ripple-container"></div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-content">
                  <div className="tab-content">
                    <div className="tab-pane active" id="home">
                      {center}
                    </div>
                    <div className="tab-pane" id="collections">
                      <p>Collections</p>
                    </div>
                    <div className="tab-pane" id="read_later">
                      <p>Read Later</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }

}

Main.propTypes = {

};

function createContainer() {
    var d = document.createElement('div');
    d.id = 'content';
    d.className = 'container-liquid';
    return d;
}

//domready(() =>{
    let container = createContainer();
    let domnode = document.body.appendChild(container);
    let manager = new LdJsonManager(document.getElementsByTagName('script'));
    let docScripts = manager.getBlocks();
    WrioDocumentActions.loadDocumentWithData.trigger(docScripts,window.location.href);
    ReactDOM.render(<Main />, domnode);
//});
