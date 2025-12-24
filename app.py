from flask import Flask, send_from_directory, jsonify, request, abort
import os, json, requests


# ========== CONFIG (YOUR KEYS INSERTED) =============
MAPBOX_TOKEN = 'pk.eyJ1IjoibWFubmVydWhpdGVzaCIsImEiOiJjbWZpZHh1aHkwa3h4MmlxM29wa2MxcGN2In0.wHND5nVpmR3H-HAEtR2VzA