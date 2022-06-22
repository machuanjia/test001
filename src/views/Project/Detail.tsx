import { RouteViewer } from '@/routes'

const ProjectDetail = ({ route }) => {
  return (
    <RouteViewer routers={route.children} />
  )
}

export default ProjectDetail
