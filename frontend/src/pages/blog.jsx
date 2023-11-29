import { Helmet } from 'react-helmet-async';

import BlogView from 'src/modules/blog/view';


// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Blog | Minimal UI </title>
      </Helmet>

      <BlogView />
    </>
  );
}
