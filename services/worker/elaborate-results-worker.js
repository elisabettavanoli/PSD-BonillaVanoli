import { Camunda8 } from '@camunda8/sdk'

const camunda = new Camunda8({
	ZEEBE_ADDRESS: 'localhost:26500',
	//ZEEBE_REST_ADDRESS: 'http://localhost:8088',
	ZEEBE_CLIENT_ID: 'zeebe',
	ZEEBE_CLIENT_SECRET: 'zecret',
	CAMUNDA_OAUTH_STRATEGY: 'OAUTH',
	CAMUNDA_OAUTH_URL:
		'http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token',
	CAMUNDA_TASKLIST_BASE_URL: 'http://localhost:8082',
	CAMUNDA_OPERATE_BASE_URL: 'http://localhost:8081',
	CAMUNDA_OPTIMIZE_BASE_URL: 'http://localhost:8083',
	CAMUNDA_MODELER_BASE_URL: 'http://localhost:8070/api',
	CAMUNDA_TENANT_ID: '', // We can override values in the env by passing an empty string value
	CAMUNDA_SECURE_CONNECTION: false
})

const zeebe = camunda.getZeebeGrpcApiClient();


zeebe.createWorker({
  taskType: "elaborate-results-worker",
  taskHandler: async (job) => {
    const trialId = job.variables.trialId;
    try {
      const response = await fetch(`http://localhost:8080/v1/trials/${trialId}/results`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_JWT_TOKEN' // Sostituisci con token valido
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch results: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched data:', data);
      const results = data.results;
      console.log('Fetched results:', results);

      let totalSamples = 0;
      let totalSuccess = 0;

      for (const result of results) {
        totalSamples += Number(result.num_samples);
        totalSuccess += Number(result.num_success);
      }

      const successAverage = totalSamples > 0 ? totalSuccess / totalSamples : 0;

      return job.complete({
        totalSamples,
        successAverage
      });
    } catch (error) {
      console.error('Error while evaluating results:', error);
      return job.fail(`Failed to evaluate results: ${error.message}`);
    }
  },
  //timeout: 15000,
});