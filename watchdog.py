import requests
import os
import time

# Query to check if the app is "Up" (1 = Up, 0 = Down)
QUERY = 'up{job="nodejs-app"}'

while True:
    try:
        response = requests.get('http://localhost:9090/api/v1/query', params={'query': QUERY})
        status = response.json()['data']['result'][0]['value'][1]

        if status == "0":
            print("App is DOWN! Restarting...")
            os.system("docker restart self-healing-monitor-app-1")
        else:
            print("App is healthy.")
    except Exception as e:
        print(f"Waiting for Prometheus... {e}")

    time.sleep(10)