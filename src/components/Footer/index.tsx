import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
const Footer: React.FC = () => {
  const defaultMessage = 'thr出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Ant Design Pro',
          title: 'Ant Design Pro',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          // 需要一个父标签
          title: <><GithubOutlined /> thr Github</>,
          href: 'https://github.com/Tangsmallrong',
          blankTarget: true,
        },
        {
          key: 'thr blog',
          title: '个人博客',
          href: 'https://www.cnblogs.com/thr-0103',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
