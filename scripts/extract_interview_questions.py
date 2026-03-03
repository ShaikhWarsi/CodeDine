import os
import csv
import json

def extract_questions():
    root_dir = 'interview-company-wise-problems-main'
    output_file = 'lib/interview_questions.json'
    
    aggregated_data = {}

    if not os.path.exists(root_dir):
        print(f"Directory {root_dir} not found.")
        return

    # Companies are directories inside root_dir
    for company_name in os.listdir(root_dir):
        company_path = os.path.join(root_dir, company_name)
        if os.path.isdir(company_path):
            # Look for '5. All.csv' or any other CSV if '5. All.csv' doesn't exist
            csv_file = os.path.join(company_path, '5. All.csv')
            if not os.path.exists(csv_file):
                # Fallback to the first CSV found
                csv_files = [f for f in os.listdir(company_path) if f.endswith('.csv')]
                if csv_files:
                    csv_file = os.path.join(company_path, csv_files[0])
                else:
                    continue

            problems = []
            try:
                with open(csv_file, mode='r', encoding='utf-8') as f:
                    reader = csv.DictReader(f)
                    for row in reader:
                        problems.append({
                            'difficulty': row.get('Difficulty', ''),
                            'title': row.get('Title', ''),
                            'frequency': row.get('Frequency', ''),
                            'acceptance_rate': row.get('Acceptance Rate', ''),
                            'link': row.get('Link', ''),
                            'topics': row.get('Topics', '')
                        })
            except Exception as e:
                print(f"Error reading {csv_file}: {e}")
                continue

            if problems:
                aggregated_data[company_name] = {
                    'company': company_name,
                    'problems': problems,
                    'count': len(problems)
                }

    # Sort companies by problem count descending
    sorted_companies = sorted(aggregated_data.values(), key=lambda x: x['count'], reverse=True)

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(sorted_companies, f, indent=2)
    
    print(f"Extracted data for {len(sorted_companies)} companies into {output_file}")

if __name__ == "__main__":
    extract_questions()
