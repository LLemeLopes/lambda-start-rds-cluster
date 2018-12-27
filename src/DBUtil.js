import RDS from 'aws-sdk/clients/rds'
import config from './config'


class DBUtil {

  constructor(tags, cluster) {
    this.tags = tags
    this.cluster = cluster
    this.rds = new RDS()
  }

  async startDBCluster() {
    console.log(`tags are ${JSON.stringify(this.tags.TagList)}`)
    const isStart = this.tags.TagList.find(element => element.Key === config.key && element.Value === 'true')
    console.log(`${this.cluster.DBClusterIdentifier}: to start or not.. ${JSON.stringify(isStart)}`)

    if (isStart) {
      const params = {
        DBClusterIdentifier: `${this.cluster.DBClusterIdentifier}`, /* required */
      }
      try {
        const data = await this.rds.startDBCluster(params).promise()
        console.log(`started db cluster ${this.cluster.DBClusterIdentifier},
           status is now ${data.DBCluster.DBClusterStatus}`)
      } catch (error) {
        console.warn(`failed to start db cluster ${this.cluster.DBClusterIdentifier}. error is: ${error}`)
      }
    }
  }
}

export default DBUtil
