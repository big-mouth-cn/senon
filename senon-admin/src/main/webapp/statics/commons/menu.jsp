<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">
      	<img alt="Brand" src="${ctx }/statics/imgs/Logo_NoneFont_Black_Full.png" width="20" height="20">
      </a>
    </div>

    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="dropdown">
        	<li><a href="${ctx }/job">Job</a></li>
        	<li><a href="${ctx }/job">Node</a></li>
        	<li><a href="${ctx }/job">Log</a></li>
        	<li><a href="${ctx }/job">Monitor</a></li>
        </li>
      </ul>
    </div>
  </div>
</nav>