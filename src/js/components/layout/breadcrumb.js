const React = require('react');
const { Route, Link } = require('react-router-dom');
const { Breadcrumb, BreadcrumbItem } = require('reactstrap');


// Fixme: no central configuration for routes
const routes = require('../../routes');
const findRouteName = (url) => routes[url];

const getPaths = (pathname) => {
  const paths = ['/'];

  if (pathname === '/') return paths;

  pathname.split('/').reduce((prev, curr, index) => {
    const currPath = `${prev}/${curr}`;
    paths.push(currPath);
    return currPath;
  });
  console.log(paths);
  return paths;
};

const BreadcrumbsItem = ({match}) => {
  var routeName = findRouteName(match.url);
  if (routeName) {
    return (
      match.isExact ?
      (
        <BreadcrumbItem active>{routeName}</BreadcrumbItem>
      ) :
      (
        <BreadcrumbItem>
          <Link to={match.url || ''}>
            {routeName}
          </Link>
        </BreadcrumbItem>
      )
    );
  }
  return null;
};

const Breadcrumbs = ({location: {pathname}, match}) => {
  var paths = getPaths(pathname);
  var items = paths.map((path, i) => 
    (<Route key={i} path={path} component={BreadcrumbsItem} />));
  return (
    <Breadcrumb>
      {items}
    </Breadcrumb>
  );
};


module.exports = (props) => (
  <div>
    <Route path="/:path" component={Breadcrumbs} {...props} />
  </div>
);
