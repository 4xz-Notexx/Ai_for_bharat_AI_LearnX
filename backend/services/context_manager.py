from datetime import datetime, timedelta

sessions = {}

SESSION_TIMEOUT = 2  # hours

def get_session(user_id):
    session = sessions.get(user_id)

    if session:
        if datetime.now() - session["last_activity"] > timedelta(hours=SESSION_TIMEOUT):
            del sessions[user_id]
            return None
        session["last_activity"] = datetime.now()
        return session

    return None


def create_session(user_id):
    sessions[user_id] = {
        "context": [],
        "difficulty": "beginner",
        "last_activity": datetime.now()
    }
    return sessions[user_id]


def add_context(user_id, content):
    session = sessions.get(user_id)
    if session:
        session["context"].append(content)

def clear_session(user_id):
    if user_id in sessions:
        del sessions[user_id]
        return True
    return False        