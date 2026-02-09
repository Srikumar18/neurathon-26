from datetime import datetime

class Employer:

    @staticmethod
    def create_payload(email):

        return {
            "email": email,
            "created_at": datetime.utcnow(),
        }
