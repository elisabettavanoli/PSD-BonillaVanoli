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
          'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIycnhEbHk1dnhFci13U0FtcnhiRG82bF9lYjNkYzktRnF0VUNTU1FuNHZZIn0.eyJleHAiOjE3NTMyMjg1MzUsImlhdCI6MTc1MzE5MjUzNSwianRpIjoib25ydHJvOmIxMzVlNzRhLTg5ZGMtNGQwNC04NjVlLWM2M2I1YTc0MWU2NCIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6OTA5MC9yZWFsbXMvbWFzdGVyIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NWUzYzk2LTI4NmMtNDQ5Mi1hMmEwLWZmNjFhYTliMzY3YiIsInR5cCI6IkJlYXJlciIsImF6cCI6InBzZC1jbGluaWNhbC10cmlhbCIsInNpZCI6ImE5YzJhNTM5LTcyNTktNDg5ZS1iYjZhLTdhYWY1YWE5OWUyNCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiZWxpIn0.ei3hpv63Cdv-8OMfsjo3NfnKzTcV1UYfXh_XZ5HW3EYpLJF7Ku_JfMnXQgHtWGGTBtt_N8nWavXqktWhHmpjSOE0ADDboqlwtSW1k1qG2jKtXBt76qxM13PKayNoBR6epbEi9fD2v3LX2PoMA_sgQU5JsCgO0uqji3sP8_fmUxZtQ8dyIGga1rFSd4Qtvy_v-dnMLJLQkuwhmV3dL_VPgLlRobrW-D3w8NPxV-A0e2nVESl43iyROuq1MIUDgwbl3q86QTEHyzyvVAfoKsN574BfIfqAnXoNS1e1nGZ72s_yfwJhFD7P2UhyugO4a7MI1K8dqVLQaBZYJ6AjeWWFyQ' // Sostituisci con token valido
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